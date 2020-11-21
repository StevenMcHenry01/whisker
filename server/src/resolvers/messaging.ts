// 3rd party imports
import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Query } from 'type-graphql'
import { getConnection } from 'typeorm'

// my imports
import { ExpressRedisContext } from '../tsTypes/ExpressRedisContext'
import { Cat } from '../entities/Cat'
import { isAuth } from '../middleware/isAuth'
import { isCatSelected } from '../middleware/isCatSelected'
import { ChatSession } from '../entities/ChatSession'
import { Message } from '../entities/Message'
import { MessageResponse } from '../graphqlTypes/MessageResponse'
import { MessageInput } from '../graphqlTypes/MessageInput'
import { Match } from '../entities/Match'
import { SessionResponse } from '../graphqlTypes/SessionResponse'

@Resolver(Message)
export class MessageResolver {
  connection = getConnection()

  // ~ SEND MESSAGE TO MATCH
  @Mutation(() => MessageResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async sendMessage(
    @Arg('options') options: MessageInput,
    @Ctx() { req }: ExpressRedisContext
  ): Promise<MessageResponse> {
    const catSender = await Cat.findOne(parseInt(req.session?.selectedCatId))
    if (!catSender) {
      return {
        errors: [
          {
            field: 'message',
            message: 'could not find either the sender or reciever for that message.',
          },
        ],
      }
    }
    const match = await Match.findOne({ where: { cat: catSender, matchCatId: options.receiverId } })
    if (!match) {
      return {
        errors: [
          {
            field: 'message',
            message: 'you two are not matched.',
          },
        ],
      }
    }
    const session = await ChatSession.findOne(match.chatSessionId)

    if (!session) {
      return {
        errors: [
          {
            field: 'message',
            message: 'You do not have a current chat session with that cat.',
          },
        ],
      }
    }

    // create new message
    const message = new Message()
    message.body = options.body
    message.chatSession = session
    message.senderId = catSender.id
    await this.connection.manager.save(message)

    return {
      message: message,
    }
  }

  // ~ GET CHAT SESSION
  @Query(() => SessionResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async getChatSession(@Arg('id') id: number): Promise<SessionResponse> {
    const chatSession = await ChatSession.findOne(id)

    if (!chatSession) {
      return {
        errors: [
          {
            field: 'chat session',
            message: 'chat session was not found.',
          },
        ],
      }
    } else {
      return { chatSession: chatSession }
    }
  }
}
