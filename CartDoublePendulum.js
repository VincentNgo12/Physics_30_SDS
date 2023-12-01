class CartDoublePendulum {
    constructor(x, y, cart_mass, bob_mass) {
      // Initialize properties and parameters
          this.cart_pos = createVector(x,y);
          this.cart_xV = 0;
          this.cart_xA = 0;
        this.cartWidth = cartWidth;
        this.cartHeight = cartHeight;
        this.l1 = 150;
          this.l2 = 150;
          this.cart_mass = cart_mass;
          this.bob_mass = bob_mass;
          this.angle1 = 0.001;
          this.angle1_V = 0;
          this.angle1_A = 0;
          this.angle2 = 0.001;
          this.angle2_V = 0;
          this.angle2_A = 0;
          
          this.wheel_radius = cartWidth/8;
          this.force = createVector(0,0);
  
    }
  
  
    update() {
      // Update the system's state
          // Calculate the angular acceleration first
          this.angle2_A = this.get_angular_acceleration2();
          this.angle2_V += this.angle2_A * dt;
          this.angle2 += this.angle2_V * dt;
          
          this.angle1_A = this.get_angular_acceleration1();
          this.angle1_V += this.angle1_A * dt;
          this.angle1 += this.angle1_V * dt;
          
          // Calculate the horizontal acceleration
          this.cart_xA = this.get_horizontal_acceleration();
          this.cart_xV += this.cart_xA * dt;
          // check for border collision
          if(this.cart_pos.x == -(width/2 - cartWidth/2) || this.cart_pos.x == width/2 -cartWidth/2){
              this.cart_xV *= -0.8;
          }
          this.cart_pos.x += this.cart_xV * dt;
          
          this.cart_pos.x = constrain(this.cart_pos.x, -(width/2 - cartWidth/2), width/2 - cartWidth/2); //constrain to within screen
          
          this.calculate_score(); //Update Score
          return;
    }
      
      
      get_angular_acceleration1(){
          let m1 = this.bob_mass;
          let m2 = this.bob_mass;
          let l1 = this.l1;
          let l2 = this.l2;
          let theta1 = this.angle1;
          let theta1_dot = this.angle1_V;
          let theta1_ddot = this.angle1_A;
          let theta2 = this.angle2;
          let theta2_dot = this.angle2_V;
          let theta2_ddot = this.angle2_A;
          let x_ddot = this.cart_xA;
          
          let numerator = (m1*l1+m2*l1)*x_ddot*cos(theta1)-m2*l1*l2*theta2_ddot*cos(theta1-theta2)-m2*l1*l2*sin(theta1-theta2)*(theta2_dot**2)+(m1+m2)*g*l1*sin(theta1);
          let denominator = m1*(l1**2) + m2*(l1**2);
          
          return numerator / denominator;
      }
      
      
      get_angular_acceleration2(){
          let m1 = this.bob_mass;
          let m2 = this.bob_mass;
          let l1 = this.l1;
          let l2 = this.l2;
          let theta1 = this.angle1;
          let theta1_dot = this.angle1_V;
          let theta1_ddot = this.angle1_A;
          let theta2 = this.angle2;
          let theta2_dot = this.angle2_V;
          let theta2_ddot = this.angle2_A;
          let x_ddot = this.cart_xA;
          
          let numerator = m2*l2*x_ddot*cos(theta2)-m2*l1*l2*theta1_ddot*cos(theta1-theta2)+m2*l1*l2*sin(theta1-theta2)*(theta1_dot**2)+m2*g*l2*sin(theta2);
          let denominator = m2*(l2**2);
          
          return numerator / denominator;
      }
      
      
      get_horizontal_acceleration(){
          let F = this.force.x;
          let M = this.cart_mass;
          let m1 = this.bob_mass;
          let m2 = this.bob_mass;
          let l1 = this.l1;
          let l2 = this.l2;
          let theta1 = this.angle1;
          let theta1_dot = this.angle1_V;
          let theta1_ddot = this.angle1_A;
          let theta2 = this.angle2;
          let theta2_dot = this.angle2_V;
          let theta2_ddot = this.angle2_A;
          
          let numerator = F + (m1*l1+m2*l1)*theta1_ddot*cos(theta1)-(m1*l1+m2*l1)*(theta1_dot**2)*sin(theta1)+m2*l2*theta2_ddot*cos(theta2)-m2*l2*(theta2_dot**2)*sin(theta2);
          let denominator = M + m1 + m2;
          
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
          
          
      // Calculate the position of the pendulum bob 1
      let pendulum1X = this.cart_pos.x - this.l1 * sin(this.angle1);
      let pendulum1Y = this.cart_pos.y + this.wheel_radius + this.cartHeight/2 + this.l1 * cos(this.angle1);
          // Draw the pendulum bob
      fill(0); // Color of the pendulum bob
      circle(pendulum1X, pendulum1Y, 50);
          
          textSize(25);
          fill(255); // Text Color
          push();
          translate(pendulum1X-15, pendulum1Y-10);
          // Flip the y-axis
        scale(1, -1);
          text(this.bob_mass, 0, 0);
          pop();
          
          
          // Calculate the position of the pendulum bob 2
      let pendulum2X = this.cart_pos.x - this.l1 * sin(this.angle1) - this.l2 * sin(this.angle2);
      let pendulum2Y = this.cart_pos.y + this.wheel_radius + this.cartHeight/2 + this.l1 * cos(this.angle1) + this.l2 * cos(this.angle2);
          // Draw the second pendulum bob
      fill(0); // Color of the pendulum bob
      circle(pendulum2X, pendulum2Y, 50);
          
          textSize(25);
          fill(255); // Text Color
          push();
          translate(pendulum2X-15, pendulum2Y-10);
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
      line(this.cart_pos.x, this.cart_pos.y + this.wheel_radius + this.cartHeight, pendulum1X, pendulum1Y);
          
          // Draw the second pendulum rod
      stroke(0); // Color of the pendulum rod
      line(pendulum1X, pendulum1Y, pendulum2X, pendulum2Y);
    }
      
      
      calculate_score(){
          let angle1 = abs(this.angle1) % TWO_PI;
          let angle2 = abs(this.angle2) % TWO_PI;
          if((angle1 <= PI/4 || angle1 >= 7*PI/4) && (angle2 <= PI/4 || angle2 >= 7*PI/4)){
              score += dt;
              if(score > high_score) high_score = score;
              return;
          }
          
          score = 0;
      }
  }