const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const Mail = require('nodemailer/lib/mailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: 'titico0306@gmail.com',
        pass: 'bhwpawbqilfhjfwk'
    }
})

const registerEmail = async (userEmail, emailToken) => {
    try {
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Flick Base",
                link: `http://localhost:3000/`
            }
        })
        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to flickbase! We are very excited to have you on board',
                action: {
                    instructions: 'To get validate your account, please click here: ',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate Your Account',
                        link: `http://localhost:3000/verification?t=${emailToken}`
                    }
                },
                outro: 'Need help or have any questions? just reply to this email we would love to help'
            }
        }
        let emailBody = mailGenerator.generate(email)
        let message = {
            from: 'titico0306@gmail.com',
            to: userEmail,
            subject: "Welcome to Flick Base ",
            html: emailBody
        }

        await transporter.sendMail(message)
        return true

    } catch (error) {
        console.log(error)
        if (error) throw error
    }
}

const contactMail = async (contact) => {
    try {
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Flick Base",
                link: `http://localhost:3000/`
            }
        })

        const email = {
            body: {
                intro: [
                    'Someone Sent you a message',
                    `Email:  ${contact.email}`,
                    `Firstname: ${contact.firstname}`,
                    `Lastname: ${contact.lastname}`,
                ],
                outro: [`${contact.message}`]
            }
        }
        let emailBody = mailGenerator.generate(email)
        let message = {
            from: 'titico0306@gmail.com',
            to: 'titico0306@gmail.com',
            subject: "Contact",
            html: emailBody
        }

        await transporter.sendMail(message)
        return true

    } catch (error) {
        if (error) throw error
    }
}

module.exports = { contactMail, registerEmail }