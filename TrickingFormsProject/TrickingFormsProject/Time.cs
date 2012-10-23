using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TrickingFormsProject
{
    public partial class Time : Form
    {
        public Timer TimerFrame0;
        public Timer TimerFrame1;
        public Timer TimerFrame2;
        public const int RefreshRate = 80;

        public Time()
        {
            InitializeComponent();

            components = new System.ComponentModel.Container();

            TimerFrame0 = new System.Windows.Forms.Timer(components);
            TimerFrame1 = new System.Windows.Forms.Timer(components);
            TimerFrame2 = new System.Windows.Forms.Timer(components);
        }

        public void Start()
        {
            //TimerFrame0.Tick += Main.SIF.sprStand.Draw_O;
            //TimerFrame1.Tick += Main.SIF.sprWalk.Draw_A;
            //TimerFrame2.Tick += Main.SIF.sprWalk.Draw_B;

            //TimerFrame0.Enabled = true;
        }
    }
}

