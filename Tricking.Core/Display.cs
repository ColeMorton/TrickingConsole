using System;
using System.Threading;

namespace Tricking.Core
{
    public static class Display
    {
        public static void Waiting()
        {
            for (var i = 0; i < 3; i++)
            {
                Thread.Sleep(400);
                Console.Write(".");
            }
            Console.WriteLine();
        }
    }
}
