using System;
using System.Linq;
using Tricking.Actions;
using Tricking.Data;

namespace Tricking.Core
{
    public static class AskFor
    {
        public static Tricker Tricker()
        {
            string input;

            var context = new TrickingContext();
            var trickers = context.Trickers.Include("Tricks");

            do
            {
                Console.WriteLine();
                Console.WriteLine("Please select a tricker from the following:");

                foreach (var tricker in trickers)
                    Console.WriteLine(tricker.Name);

                Console.WriteLine();
                Console.WriteLine("Exit: To leave");

                input = Console.ReadLine();
                if (!string.IsNullOrEmpty(input)) input = input.ToLower();
                Console.WriteLine();

                if (string.IsNullOrEmpty(input) || input == "exit")
                    Environment.Exit(1);

            } while (!trickers.Select(t => t.Name.ToLower()).Contains(input));

            var trickerSelected = context.Trickers.Single(t => t.Name.ToLower() == input);
            Console.WriteLine("You selected: " + trickerSelected.Name);
            Console.WriteLine();

            return trickerSelected;
        }

        public static TrickersTrick Trick(Tricker tricker)
        {
            string input;

            do
            {
                Console.WriteLine();
                Console.WriteLine("Please select a trick from the following:");

                foreach (var trick in tricker.Tricks)
                    Console.WriteLine(trick.Trick.Name);

                Console.WriteLine();
                Console.WriteLine("Exit: To leave");

                input = Console.ReadLine();
                if (!string.IsNullOrEmpty(input)) input = input.ToLower();
                Console.WriteLine();

                if (string.IsNullOrEmpty(input) || input == "exit")
                    Environment.Exit(1);

            } while (!tricker.Tricks.Select(t => t.Trick.Name.ToLower()).Contains(input));

            var trickSelected = tricker.Tricks.Single(t => t.Trick.Name.ToLower() == input);
            Console.WriteLine("You selected: " + trickSelected.Trick.Name);
            Console.WriteLine();

            return trickSelected;
        }

        public static void DoTrick(TrickersTrick trick)
        {
            string input;

            do
            {
                Console.WriteLine();
                Console.WriteLine("Would you like to retry? y/n");
                input = Console.ReadLine();
                Console.WriteLine();

                if (input != null && input.ToLower() == "y")
                    Do.Trick(trick.Id);
            } while (input != null && input.ToLower() == "y");
        }
    }
}
