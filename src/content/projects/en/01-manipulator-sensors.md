---
lang: "en"
sectionTitle: "Projects"
sectionOrder: 40
order: 0
title: "Sensor Integration for an Industrial Manipulator"
role: "Project Lead"
period: "December 2021–June 2022"
---

Integrated a force/torque sensor at the end effector to enable compliant position and orientation changes under external forces.

- Implemented and tuned an impedance controller in C++ so that the manipulator responded to external forces like a spring-damper system. 
- Combined optical motion capture with an industrial manipulator to estimate a flying tennis ball's trajectory and landing point, and simulated interception motions.
- Predicted the trajectory with least-squares estimation and used cubic interpolation in joint space to guide the arm toward the estimated landing point.
- Derived and reproduced the six-point calibration method in simulation, using ROS MoveIt for kinematics, to verify that the catching tool center's position and orientation relative to the arm could be determined.
