# Physics_30_SDS

Hi, this is my a SDS project for my Physics 30 class.

This is a p5.js physics simulation to model and simulate the dynamics of the inverted pendulum on a cart problem.

Maybe, just maybe, we might be able to implement a control method for this project.


# Double Pendulum on a Cart

## Deriving The Equations of Motion
Kinematics of Pendulums
<div align="center">Pendulum 1</div>

$$ x_1 = x - l_1\sin(\theta_1) $$

$$ y_1 = l_1\cos(\theta_1) $$

$$ \dot{x_1} = \dot{x} - l_1\dot{\theta_1}\cos(\theta_1) $$

$$ \dot{y_1} = -l_1\dot{\theta_1}\sin(\theta_1) $$

</br></br>
<div align="center">Pendulum 2</div>

$$ x_2 = x - l_1\sin(\theta_1) - l_2\sin(\theta_2) $$

$$ y_2 = l_1\cos(\theta_1) + l_2\cos(\theta_2) $$

$$ \dot{x_2} = \dot{x} - l_1\dot{\theta_1}\cos(\theta_1) - l_2\dot{\theta_2}\cos(\theta_2) $$

$$ \dot{y_2} = -l_1\dot{\theta_1}\sin(\theta_1) - l_2\dot{\theta_2}\sin(\theta_2) $$



### Potential Energy

$$ V = m_1gy_1 + m_2gy_2 $$

$$ V = m_1gl_1\cos(\theta_1) + m_2gl_1\cos(\theta_1) + m_2gl_2\cos(\theta_2) $$

$$ V = (m_1 + m_2)gl_1\cos(\theta_1) + m_2gl_2\cos(\theta_2) $$

### Kinetic Energy

$$ T = \frac{1}{2}M\dot{x}^2 + \frac{1}{2}m_1(\dot{x_1}^2 + \dot{y_1}^2) + \frac{1}{2}m_2(\dot{x_2}^2 + \dot{y_2}^2) $$

</br></br>

<div align="center">Pendulum 1</div>

$$ \frac{1}{2}m_1(\dot{x_1}^2 + \dot{y_1}^2) = \frac{1}{2}m_1[\dot{x}^2 - 2\dot{x}l_1\dot{\theta_1}\cos(\theta_1) + (l_1\dot{\theta_1}\cos(\theta_1))^2 + (l_1\dot{\theta_1}\sin(\theta_1))^2] $$

$$ = \frac{1}{2}m_1[\dot{x}^2 - 2\dot{x}l_1\dot{\theta_1}\cos(\theta_1) + l_1^2\dot{\theta_1}^2(\cos(\theta_1)^2 + \sin(\theta_1)^2)] $$

$$ = \frac{1}{2}m_1[\dot{x}^2 - 2\dot{x}l_1\dot{\theta_1}\cos(\theta_1) + l_1^2\dot{\theta_1}^2] $$

</br></br></br>

<div align="center">Pendulum 2</div>

$$ \frac{1}{2}m_2(\dot{x_2}^2 + \dot{y_2}^2) = $$
