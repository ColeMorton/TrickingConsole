using System.Web;

namespace Tricking.Mvc.Models
{
    public class Console
    {
        public string Text
        {
            get
            {
                var session = HttpContext.Current.Session;
                var consoleText = session["ConsoleText"] ?? string.Empty;

                return 
                    string.IsNullOrEmpty(consoleText.ToString()) ? 
                    string.Empty : consoleText.ToString();
            }
            set 
            { 
                var session = HttpContext.Current.Session;
                var consoleText = session["ConsoleText"] ?? string.Empty;

                if (consoleText.ToString() == value) return;
                session["ConsoleText"] = value;
            }
        }

        public void WriteLine(string line)
        {
            Text += line + NewLine;
        }

        public void Clear()
        {
            Text = string.Empty;
        }

        public string NewLine
        {   
            get
            {
                return "\n";
            }  
        }
    }
}