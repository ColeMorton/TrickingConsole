namespace MvcApp.Models
{
    public class Console
    {
        public string Text { get; set; }

        public void WriteLine(string line)
        {
            if (!string.IsNullOrEmpty(Text))
            {
                Text += NewLine;
            }

            Text += line + NewLine;
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