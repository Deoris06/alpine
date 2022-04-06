

exports.registerEmailTemplate = (email, token, first_name) => {
    const capitalize_first_letter = first_name
    const capitalized_first_letter = capitalize_first_letter.charAt(0).toUpperCase() + capitalize_first_letter.slice(1)
    const now = new Date();
    const this_year = now.getFullYear();
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]       
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                        <body style="color: #000;">
                            <div style="margin: 0 auto; width: 500px; padding: 10px 10px; background-color: #ffffff">
                                <img  
                                src="https://i.ibb.co/7J0wbqr/default-monochrome.png 
                                alt="Knock" 
                                style="width:100%; height:100px; object-fit: cover" 
                                >
                                <div style="margin-top: 55px; margin-bottom: 30px; margin-left: 10px">
                                <h1>Hello ${capitalized_first_letter},</h1>
                                <p style="font-size: 14px;">Please click the link below to activate your account.</p>
                                <p style="font-size: 14px;">If you did not create an account, no further action is required.</p>
                                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                                
                                <p style="font-size: 14px; margin-top:10px;">
                                    Thanks, <br /> Alpine
                                </p>
                            </div>
                            <div style=" margin-bottom: 20px; background-color: #f7f7f7; padding: 12px 12px;">
                                <div style="max-width: 270px; margin:0 auto; text-align:center">
                                    <p style=" text-align: center; font-size: 14px">
                                    Get in touch with us via email at <a href="">help@alpine.com</a> or reach us via Whatsapp (07035678126) 
                                    </p>
                                    <p style="font-size: 14px">&copy;${this_year} Alpine all rights reserved</p>
                                    <p style="font-size: 14px">You have received this message because you registered on our platform and you are one of our favorites.</p>
                                </div>
                            
                            </div>
                            </div>
                        </body>
                    </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Activate Your Account'
            }
        }
    };
}
