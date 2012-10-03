using System;
using Tricking.Actions;
using Tricking.Core;

namespace Tricking
{
    class Program
    {
        static void Main(string[] args)
        {
            var tricker = AskFor.Tricker();
            var trick = AskFor.Trick(tricker);
            var result = Do.Trick(trick);

            if (!result)
            {
                AskFor.DoTrick(trick);
            }
            else
            {
                Console.ReadLine();
            }
        }
    }
}
