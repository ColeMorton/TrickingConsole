using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using TrickingFormsProject.Validation;

namespace TrickingFormsProject
{
    public partial class Main : Form
    {
        public static int TimeKeeper;
        public static Actions.Action Action = new Actions.Action();
        public Dictionary<string, Sprite> Sprites = new Dictionary<string, Sprite>();
        public Sprite SIF;
        public Graphics myGraphics;
        public Time GameSpeed;

        private bool switch_Trace = true;
        private string Sprite1Name = "Jim";

        public Main()
        {
            InitializeComponent();
            GameSpeed = new Time();
            myGraphics = this.CreateGraphics();
            this.Height = 500;
            this.Width = 500;
            this.Show();

            GameSpeed.TimerFrame0.Interval = (int)(Time.RefreshRate * 1.5);
            GameSpeed.TimerFrame1.Interval = Time.RefreshRate;
            GameSpeed.TimerFrame2.Interval = Time.RefreshRate;

            Init_Sprites();
            //GameSpeed.Start();
            //GameSpeed.TimerFrame0.Tick += TimerFrame0_Tick;
            //GameSpeed.TimerFrame1.Tick += TimerFrame1_Tick;
            //GameSpeed.TimerFrame2.Tick += TimerFrame2_Tick;

            //GameSpeed.TimerFrame0.Enabled = true;
        }

        //void TimerFrame2_Tick(object sender, EventArgs e)
        //{
        //    SIF.sprWalk.DrawB();
        //}

        //void TimerFrame1_Tick(object sender, EventArgs e)
        //{
        //    SIF.sprWalk.DrawA();
        //}

        //void TimerFrame0_Tick(object sender, EventArgs e)
        //{
        //    SIF.sprStand.Draw0();
        //}

        private void Init_Sprites()
        {
            string[] imageArray_Stand = {
		"D:\\I.T\\Sprites\\ManSpriteUpStanding.jpg",
		"D:\\I.T\\Sprites\\ManSpriteDownStanding.jpg",
		"D:\\I.T\\Sprites\\ManSpriteLeftStanding.jpg",
		"D:\\I.T\\Sprites\\ManSpriteRightStanding.jpg"
	};
            Sprite Sprite1 = new Sprite(Sprite1Name, imageArray_Stand);
            Sprites.Add(Sprite1Name, Sprite1);

            string[] imageArray_Walk = {
		"D:\\I.T\\Sprites\\ManSpriteUpLeft.jpg",
		"D:\\I.T\\Sprites\\ManSpriteUpRight.jpg",
		"D:\\I.T\\Sprites\\ManSpriteDownRight.jpg",
		"D:\\I.T\\Sprites\\ManSpriteDownLeft.jpg",
		"D:\\I.T\\Sprites\\ManSpriteLeftRight.jpg",
		"D:\\I.T\\Sprites\\ManSpriteLeftLeft.jpg",
		"D:\\I.T\\Sprites\\ManSpriteRightRight.jpg",
		"D:\\I.T\\Sprites\\ManSpriteRightLeft.jpg"
	};
            SIF = Sprites.First().Value;
            SIF.Add_Abl(Sprite.Abilities.Walk, imageArray_Walk);

            //Tracer.Write("Init_Sprites()")
            //Tracer.Write("  Sprite " & Sprite1Name & " initialised.")
        }

        private void Main_KeyUp(object sender, System.Windows.Forms.KeyEventArgs e)
        {
            GameSpeed.TimerFrame1.Enabled = false;
            GameSpeed.TimerFrame2.Enabled = false;
            GameSpeed.TimerFrame0.Enabled = true;
        }

        private void MovementKeyPressed(System.Windows.Forms.KeyEventArgs key)
        {
            ValidationSelection_Movement KeyValidation_Movement = new ValidationSelection_Movement(SIF, key);

            if (KeyValidation_Movement.valid)
            {
                if (key.KeyCode == Keys.W)
                {
                    SIF.setSprDir = Sprite.Direction.Up;
                    SIF.Move_Sprite(SIF.getMIF, Sprite.Direction.Up);
                }
                else if (key.KeyCode == Keys.S)
                {
                    SIF.setSprDir = Sprite.Direction.Down;
                    SIF.Move_Sprite(SIF.getMIF, Sprite.Direction.Down);
                }
                else if (key.KeyCode == Keys.A)
                {
                    SIF.setSprDir = Sprite.Direction.Left;
                    SIF.Move_Sprite(SIF.getMIF, Sprite.Direction.Left);
                }
                else if (key.KeyCode == Keys.D)
                {
                    SIF.setSprDir = Sprite.Direction.Right;
                    SIF.Move_Sprite(SIF.getMIF, Sprite.Direction.Right);
                }
            }
            else
            {
                MessageBox.Show(KeyValidation_Movement.errorMessage);
            }
            KeyValidation_Movement = null;
        }

        private void AbilityKeyPressed(System.Windows.Forms.KeyEventArgs key)
        {
            ValidationSelection_Ability KeyValidation_Ability = new ValidationSelection_Ability(SIF, key);

            if (KeyValidation_Ability.valid)
            {
                if (key.KeyCode == Keys.G & SIF.getCanWalk)
                {
                    SIF.setMIF = Sprite.Abilities.Walk;
                }
                else if (key.KeyCode == Keys.H & SIF.getCanRun)
                {
                    SIF.setMIF = Sprite.Abilities.Run;
                }
                else if (key.KeyCode == Keys.J & SIF.getCanFly)
                {
                    SIF.setMIF = Sprite.Abilities.Fly;
                }
            }
            else
            {
                MessageBox.Show(KeyValidation_Ability.errorMessage);
            }
            KeyValidation_Ability = null;
        }

        public void Tick()
        {
            TimeKeeper += 1;
        }

        private void Main_KeyDown(object sender, KeyEventArgs e)
        {
            //If Movement Key is Pressed
            if (e.KeyCode == Keys.W | e.KeyCode == Keys.S | e.KeyCode == Keys.A | e.KeyCode == Keys.D)
            {
                MovementKeyPressed(e);
            }

            //If Ability Key is Pressed
            if (e.KeyCode == Keys.G | e.KeyCode == Keys.H | e.KeyCode == Keys.J)
            {
                AbilityKeyPressed(e);
            }
        }

        public void Draw(Point sprPos, Sprite.Direction sprDir, Image sprImage)
        {
        }
    }
}
