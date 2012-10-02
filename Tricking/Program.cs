using System;
using System.Threading;
using Tricking.Models;

namespace Tricking
{
    class Program
    {
        static void Main(string[] args)
        {
            SeedDatabase();

            var tricker = AskFor.Tricker();
            var trick = AskFor.Trick(tricker);

            var result = PerformTrick(trick);

            if (!result)
            {
                string input;

                do
                {
                    Console.WriteLine();
                    Console.WriteLine("Would you like to retry? y/n");
                    input = Console.ReadLine();

                    if (input == "y")
                        PerformTrick(trick);
                } while (input == "y");
            }

            //End
            Console.ReadLine();
        }

        private static void SeedDatabase()
        {
            var context = new TrickingEntities();

            context.TrickTypes.AddObject(new TrickType { Id = 1, Name = "A" });
            context.TrickTypes.AddObject(new TrickType { Id = 2, Name = "B" });
            context.TrickTypes.AddObject(new TrickType { Id = 3, Name = "C" });

            context.SaveChanges();

            context.Trickers.AddObject(new Tricker { Id = 1, Name = "Vellu" });
            context.Trickers.AddObject(new Tricker { Id = 1, Name = "Danny" });
            context.Trickers.AddObject(new Tricker { Id = 1, Name = "Guthrie" });

            context.SaveChanges();

            context.Tricks.AddObject(new Trick { Id = 1, TrickType_Id = 1, Tricker_Id = 1 });

            context.SaveChanges();
        }

        public static void DisplayWaiting()
        {
            for (var i = 0; i < 3; i++)
            {
                Thread.Sleep(1000);
                Console.Write(".");
            }
            Console.WriteLine();
        }

        private static bool PerformTrick(Trick trick)
        {
            Console.Write("Performing trick:");
            DisplayWaiting();

            var chance = Dice.Roll();

            if (chance * trick.Profiency > 50)
            {
                Console.WriteLine("Success!!");
                return true;
            }
            else
            {
                Console.WriteLine("Failed!!");
                return false;
            }
        } 
    }
}
