using System;
using Data;

namespace CodeFirstMigrations
{
    class Program
    {
        static void Main(string[] args)
        {
            var trickers = new TrickingContext().Trickers;

            foreach (var tricker in trickers)
            {
                Console.WriteLine(tricker.Name);
            }

            Console.WriteLine();
            Console.ReadLine();
        }
    }
}
