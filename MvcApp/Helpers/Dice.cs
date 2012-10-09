using System;

namespace Tricking.Mvc.Helpers
{
    public static class Dice
    {
        public static int Roll(int range = 21)
        {
            var rnd = new Random();
            var result = rnd.Next(1, range + 1);
            return result;
        }
    }
}
