using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TrickingFormsProject.Validation
{
    public class ValidationSelection_Ability
    {
        public bool valid;
        public string errorMessage;
        private Sprite SIF;

        private System.Windows.Forms.KeyEventArgs keyPressed;
        public ValidationSelection_Ability(Sprite SIF, System.Windows.Forms.KeyEventArgs keyPressed)
        {
            this.SIF = SIF;
            this.keyPressed = keyPressed;

            switch (keyPressed.KeyCode)
            {
                case Keys.G:
                    valid = ValidateWalk();
                    break;
                case Keys.H:
                    valid = ValidateRun();
                    break;
                case Keys.J:
                    valid = ValidateFly();
                    break;
            }
        }

        public bool ValidateWalk()
        {
            switch (SIF.getCanWalk)
            {
                case true:
                    return true;
                case false:
                    errorMessage = "To enable " + SIF.getSprName + " to Walk, you must first initialize its ability";
                    break;
            }

            return false;
        }

        public bool ValidateRun()
        {
            switch (SIF.getCanRun)
            {
                case true:
                    return true;
                case false:
                    errorMessage = "To enable " + SIF.getSprName + " to Run, you must first initialize its ability";
                    break;
            }

            return false;
        }

        public bool ValidateFly()
        {
            switch (SIF.getCanFly)
            {
                case true:
                    return true;
                case false:
                    break;
                //If SIF.ToString = DBZ.Man Then
                //errorMessage = "Sprite's of type Man are not capable of Flying"
                //Return False
                //Else
                //errorMessage = "To enable " & SIF.getSprName & " to Fly, you must first initialize its ability"
                //Return False
                //End If
            }

            return false;
        }
    }
}
