import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service:'gmail',
	auth: {
		user: 'mm930199@gmail.com',
		pass: ''
	}
})

const sendMail = (req,res,next) =>{
	let mailOptions = {
		from: 'Socialite',
		to: req.email,
		subject: req.subject,
		text: req.message
	}
	transporter.sendMail(mailOptions,(err,info)=>{
			if (err) throw err
				console.log(info.response)
		})
	res.send('email sent')
} 
export {sendMail}

