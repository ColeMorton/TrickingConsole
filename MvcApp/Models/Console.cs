namespace MvcApp.Models
{
    public static class Console
    {
        public static string Heading()
        {
            return "Console: ";
        }

        public static string WriteLine(string text, string line)
        {
            return text + NewLine + line + NewLine;
        }

        public static string NewLine
        {   
            get
            {
                return "\n";
            }  
        }
    }
}