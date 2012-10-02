using System;

namespace Tricking
{
    public static class AskFor
    {
        public static Trickers Tricker()
        {
            string input;
            Trickers tricker;

            do
            {
                Console.WriteLine();
                Console.WriteLine("Please select a tricker from the following:");
                Console.WriteLine(Trickers.Vellu);
                Console.WriteLine(Trickers.Scotty);
                Console.WriteLine(Trickers.Danny);
                Console.WriteLine();
                Console.WriteLine("Exit: To leave");

                input = Console.ReadLine();
                Console.WriteLine();

                if (string.IsNullOrEmpty(input) || input.ToLower() == "exit")
                    Environment.Exit(1);

            } while (!Enum.TryParse(input, out tricker));

            Console.WriteLine("You selected: " + tricker);
            Console.WriteLine();

            return tricker;
        }

        public static Tricks Trick()
        {
            string input;
            Tricks trick;

            do
            {
                Console.WriteLine();
                Console.WriteLine("Please select a trick from the following:");
                Console.WriteLine(Tricks.Pop360);
                Console.WriteLine(Tricks.BackFlip);
                Console.WriteLine(Tricks.ButterflyTiwst);
                Console.WriteLine();
                Console.WriteLine("Exit: To leave");

                input = Console.ReadLine();
                Console.WriteLine();

                if (string.IsNullOrEmpty(input) || input.ToLower() == "exit")
                    Environment.Exit(1);

            } while (!Enum.TryParse(input, out trick));

            Console.WriteLine("You selected: " + trick);
            Console.WriteLine();

            return trick;
        }
    }
}
