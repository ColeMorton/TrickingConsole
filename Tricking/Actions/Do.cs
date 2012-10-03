using System;
using Tricking.Core;
using Tricking.Data;

namespace Tricking.Actions
{
    public static class Do
    {
        public static bool Trick(TrickersTrick trick)
        {
            Console.Write("Performing trick:");
            Display.Waiting();

            var chance = Dice.Roll();

            if (chance * trick.Profiency > 50)
            {
                Console.WriteLine("Success!!");
                return true;
            }
            Console.WriteLine("Failed!!");
            return false;
        } 
    }
}
