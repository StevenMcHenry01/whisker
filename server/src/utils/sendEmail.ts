import mailgun from 'mailgun-js'

export const sendEmail = async (html: string, email: string, link: string) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY as string,
    domain: process.env.MAILGUN_DOMAIN as string,
  })

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: 'Hello',
    html: `<html><body>${html} - If link does not work, please paste this into your browser: ${link}</body></html>`,
  }

  await mg.messages().send(data, function (error, body) {
    console.log(body)
  })
}
