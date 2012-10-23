using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrickingFormsProject.Validation
{
    public class ValidationSelection_Movement
    {
        public bool valid;
        public string errorMessage;
        private Sprite SIF;

        private System.Windows.Forms.KeyEventArgs keyPressed;
        public ValidationSelection_Movement(Sprite SIF, System.Windows.Forms.KeyEventArgs keyPressed)
        {
            this.SIF = SIF;
            this.keyPressed = keyPressed;

            valid = true;
        }
    }
}
