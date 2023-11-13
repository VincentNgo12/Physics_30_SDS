class CartPendulum {
    constructor(x, y, cart_mass, pendulum_length, bob_mass) {
      // Initialize properties and parameters
          this.cart_pos = createVector(x,y);
          this.cart_xV = 0;
          this.cart_xA = 0;
      this.cartWidth = cartWidth;
      this.cartHeight = cartHeight;
      this.l = pendulum_length;
          this.cart_mass = cart_mass;
          this.bob_mass = bob_mass;
          this.angle = 0.001;
          this.angle_V = 0;
          this.angle_A = 0;
          
          this.wheel_radius = cartWidth/8;
          this.force = createVector(0,0);
  
    }
  
  
    update() {
      // Update the system's state
          // Calculate the angular acceleration first
          this.angle_A = this.get_angular_acceleration();
          this.angle_V += this.angle_A * dt;
          this.angle += this.angle_V * dt;
          
          // Calculate the horizontal acceleration
          this.cart_xA = this.get_horizontal_acceleration();
          this.cart_xV += this.cart_xA * dt;
          // check for border collision
          if(this.cart_pos.x == -(width/2 - cartWidth/2) || this.cart_pos.x == width/2 -cartWidth/2){
              this.cart_xV *= -1;
          }
          this.cart_pos.x += this.cart_xV * dt;
          
          this.cart_pos.x = constrain(this.cart_pos.x, -(width/2 - cartWidth/2), width/2 - cartWidth/2); //constrain to within screen
          return;
    }
      
      
      get_angular_acceleration(){
          let theta = this.angle;
          let theta_ddot = this.angle_A;
          let x_ddot = this.cart_xA;
          
          let numerator = x_ddot*cos(theta) + g*sin(theta);
          
          return numerator / this.l;
      }
      
      
      get_horizontal_acceleration(){
          let F = this.force.x;
          let m1 = this.cart_mass;
          let m2 = this.bob_mass;
          let theta = this.angle;
          let theta_dot = this.angle_V;
          let theta_ddot = this.angle_A;
          
          let numerator = F + m2*this.l*theta_ddot*cos(theta) - m2*this.l*theta_dot**2*sin(theta);
          let denominator = m1 + m2;
          
          return numerator/denominator - friction * this.cart_xV;//Minus friction factor
      }
  
      
    show() {// Draw the cart-pendulum system
          noStroke();
          // Draw them wheels
          fill(0);
          circle(this.cart_pos.x - cartWidth/4, this.cart_pos.y + this.wheel_radius, this.wheel_radius*2);
          circle(this.cart_pos.x + cartWidth/4, this.cart_pos.y + this.wheel_radius, this.wheel_radius*2);
          // Draw the cart
      let cartX = this.cart_pos.x - this.cartWidth / 2;
      let cartY = this.cart_pos.y + this.wheel_radius;
      fill(100, 100, 100); // Color of the cart
      rect(cartX, cartY, this.cartWidth, this.cartHeight);
          
          
      // Calculate the position of the pendulum bob
      let pendulumX = this.cart_pos.x - this.l * sin(this.angle);
      let pendulumY = this.cart_pos.y + this.wheel_radius + this.cartHeight/2 + this.l * cos(this.angle);
          // Draw the pendulum bob
      fill(0); // Color of the pendulum bob
      circle(pendulumX, pendulumY, 50);
          
          textSize(25);
          fill(255); // Text Color
          push();
          translate(pendulumX-15, pendulumY-10);
          // Flip the y-axis
        scale(1, -1);
          text(this.bob_mass, 0, 0);
          pop();
          
          push();
          translate(cartX + this.cartWidth/2 -15, cartY + this.cartHeight/2 -10);
          // Flip the y-axis
        scale(1, -1);
          text(this.cart_mass, 0, 0);
          pop();
  
          
           // Draw the pendulum rod
      stroke(0); // Color of the pendulum rod
      line(this.cart_pos.x, this.cart_pos.y + this.wheel_radius + this.cartHeight, pendulumX, pendulumY);
    }
  }