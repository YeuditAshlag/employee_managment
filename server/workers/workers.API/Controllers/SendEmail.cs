using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendEmail : ControllerBase
    {
    

        // POST api/<SendEmail>
        [HttpPost]
        public IActionResult Post([FromBody] MailRequest request)
        {
            try
            {
                // יצירת הודעת המייל
                MailMessage message = new MailMessage();
                message.From = new MailAddress("yeudit3269@gmail.com"); // כתובת המייל שלך
                message.To.Add(request.To); // כתובת המייל של הנמען
                message.Subject = request.Subject;
                message.Body = request.Body;

                // הגדרת השרת היוצא
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587); // כאן אתה יכול להשתמש בשרת המייל שלך

                // הגדרת אימות
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("yeudit3269@gmail.com", "hjsb jcti rwsu fsjm" );// פרטי ההתחברות שלך
                smtpClient.EnableSsl = true;

                // שליחת הודעת המייל
                smtpClient.Send(message);

                return Ok("Email sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }

       
    }
}


// מודל לבקשת המייל
public class MailRequest
{
    public string To { get; set; } // כתובת המייל של הנמען
    public string Subject { get; set; } // נושא המייל
    public string Body { get; set; } // גוף המייל
}
