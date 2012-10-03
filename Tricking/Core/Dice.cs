using System;

namespace Tricking.Core
{
    public static class Dice
    {
        public static int Roll()
        {
            var rnd = new Random();
            var result = rnd.Next(1, 21);
            return result;
        }
    }
}
