﻿using System;

namespace Tricking
{
    public static class Dice
    {
        public static int Roll()
        {
            var rnd = new Random();
            var result = rnd.Next(1, 11);
            return result;
        }
    }
}
