﻿using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tricking.Database;

namespace Tricking.Tests
{
    [TestClass]
    public class UnitTest
    {
        [TestMethod]
        public void TestMethod()
        {
            var context = new TrickingContext();

            foreach (var tricker in context.Trickers)
            {
                Console.WriteLine(tricker.Name);
            }

            Assert.IsTrue(context.Trickers.Any());
        }
    }
}
