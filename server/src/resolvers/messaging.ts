import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { Any, getConnection, In, Not } from 'typeorm'
import { ExpressRedisContext } from '../tsTypes/ExpressRedisContext'
import { Cat } from '../entities/Cat'
import { isAuth } from '../middleware/isAuth'
import { isCatSelected } from '../middleware/isCatSelected'
import { ChatSession } from '../entities/ChatSession'
import { Message } from '../entities/Message'
import { MessageResponse } from '../graphqlTypes/MessageResponse'
import { MessageInput } from '../graphqlTypes/MessageInput'

@Resolver(Message)
export class MessageResolver {
  connection = getConnection()

  // ~ SEND MESSAGE TO MATCH
  @Mutation(() => MessageResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async sendMessage(
    @Arg('options') options: MessageInput,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<MessageResponse> {
    const catSender = await Cat.findOne(parseInt(req.session?.selectedCatId))
    const catReceiver = await Cat.findOne(options.recieverId)
    if (!catSender || !catReceiver) {
      return {
        errors: [
          {
            field: 'message',
            message: 'could not find either the sender or reciever for that message.',
          },
        ],
      }
    }
    const session = await ChatSession.findOne({
      where: {
        catOneId: Any([catSender.id, catReceiver.id]),
        catTwoId: Any([catSender.id, catReceiver.id]),
      },
    })

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
    await this.connection.manager.save(message)

    return {
      chatSession: session,
    }
  }
}
