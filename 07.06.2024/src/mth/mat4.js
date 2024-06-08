/* FILE NAME  : mat4.js
 * PROGRAMMER : IF4
 * LAST UPDATE: 08.06.2024
 * PURPOSE    : Display of platonic figures.
 *              Mathematic module(matrix).
 */

import {Vec3Normalize, Vec3CrossVec3, Vec3SubVec3, Vec3DotVec3} from 'vec3.js';
import {vec3} from 'vec3.js';

export class mat4 {
  constructor(a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23,
              a30, a31, a32, a33) {
    this.a00 = a00, this.a01 = a01, this.a02 = a02, this.a03 = a03,
    this.a10 = a10, this.a11 = a11, this.a12 = a12, this.a13 = a13,
    this.a20 = a20, this.a21 = a21, this.a22 = a22, this.a23 = a23,
    this.a30 = a30, this.a31 = a31, this.a32 = a32, this.a33 = a33; 
  }
}

/* Translating matrix by vector function.
 * ARGUMENTS:
 *   - translating vector:
 *       V;
 * RETURNS:
 *   translated matrix.
 */
function MatrTranslate(V)
{
  let matr = new mat4(1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      V.x, V.y, V.z, 1);
  return matr;
} /* End of 'MatrTranslate' function */

/* Making rotation matrix by arbitrary vector function.
 * ARGUMENTS:
 *   - angle in degrees:
 *       AngleInDegree;
 *   - arbitrary vector of rotation:
 *       V;
 * RETURNS:
 *   rotation matrix.
 */
function MatrRotate(AngleInDegree, V)
{
  let a = AngleInDegree % 360 * Math.PI, s = Math.sin(a), c = Math.cos(a), matr;

  return matr = new mat4
      (c + V.x * V.x * (1 - c), V.y * V.x * (1 - c) - V.z * s, V.z * V.x * (1 - c) + V.y * s, 0,
      V.x * V.y * (1 - c) + V.z * s, c + V.y * V.y * (1 - c), V.z * V.y * (1 - c) - V.x * s, 0,
      V.x * V.z * (1 - c) - V.y * s, V.y * V.z * (1 - c) + V.x * s, c + V.z * V.z * (1 - c), 0,
      0, 0, 0, 1);
} /* End of 'MatrRotate' function */

/* Multyplying two matrixes function.
 * ARGUMENTS:
 *   - two matrixes:
 *       M1, M2;
 * RETURNS:
 *   matrix returned by multipluing of two matrixes.
 */
function MatrMulMatr(M1, M2)
{
  let r = new mat4(0, 0, 0, 0,
                   0, 0, 0, 0,  
                   0, 0, 0, 0,
                   0, 0, 0, 0)

  r.a00 = M1.a00 * M2.a00 + M1.a01 * M2.a10 + M1.a02 * M2.a20 +
    M1.a03 * M2.a30;

  r.a01 = M1.a00 * M2.a01 + M1.a01 * M2.a11 + M1.a02 * M2.a21 +
    M1.a03 * M2.a31;

  r.a02 = M1.a00 * M2.a02 + M1.a01 * M2.a12 + M1.a02 * M2.a22 +
    M1.a03 * M2.a32;

  r.a03 = M1.a00 * M2.a00 + M1.a01 * M2.a13 + M1.a02 * M2.a23 +
    M1.a03 * M2.a33;


  r.a10 = M1.a10 * M2.a00 + M1.a11 * M2.a10 + M1.a12 * M2.a20 +
    M1.a13 * M2.a30;

  r.a11 = M1.a10 * M2.a01 + M1.a11 * M2.a11 + M1.a12 * M2.a21 +
    M1.a13 * M2.a31;

  r.a12 = M1.a10 * M2.a02 + M1.a11 * M2.a12 + M1.a12 * M2.a22 +
    M1.a13 * M2.a32;

  r.a13 = M1.a10 * M2.a03 + M1.a11 * M2.a13 + M1.a12 * M2.a23 +
    M1.a13 * M2.a33;


  r.a20 = M1.a20 * M2.a00 + M1.a21 * M2.a10 + M1.a22 * M2.a20 +
    M1.a23 * M2.a30;

  r.a21 = M1.a20 * M2.a01 + M1.a21 * M2.a11 + M1.a22 * M2.a21 +
    M1.a23 * M2.a31;

  r.a22 = M1.a20 * M2.a02 + M1.a21 * M2.a12 + M1.a22 * M2.a22 +
    M1.a23 * M2.a32;

  r.a23 = M1.a20 * M2.a03 + M1.a21 * M2.a13 + M1.a22 * M2.a23 +
    M1.a23 * M2.a33;


  r.a30 = M1.a30 * M2.a00 + M1.a31 * M2.a10 + M1.a32 * M2.a20 +
    M1.a33 * M2.a30;

  r.a31 = M1.a30 * M2.a01 + M1.a31 * M2.a11 + M1.a32 * M2.a21 +
    M1.a33 * M2.a31;

  r.a32 = M1.a30 * M2.a02 + M1.a31 * M2.a12 + M1.a32 * M2.a22 +
    M1.a33 * M2.a32;

  r.a33 = M1.a30 * M2.a03 + M1.a31 * M2.a13 + M1.a32 * M2.a23 +
    M1.a33 * M2.a33;

  return r;
} /* End of 'MatrMulMatr' function */

/* Matrix look-at viewer setup function.
 * ARGUMENTS:
 *   - viewer position, look-at point, approximate up direction:
 *       Loc, At, Up1;
 * RETURNS:
 *   result matrix.
 */
function MatrView(Loc, At, Up1)
{
  let
    Dir = Vec3Normalize(Vec3SubVec3(At, Loc)),  
    Right = Vec3Normalize(Vec3CrossVec3(Dir, Up1)),
    Up = Vec3Normalize(Vec3CrossVec3(Right, Dir)),
    matr;
   matr = new mat4 (Right.X, Up.X, -Dir.X, 0,
                    Right.Y, Up.Y, -Dir.Y, 0, 
                    Right.Z, Up.Z, -Dir.Z, 0,
                    -Vec3DotVec3(Loc, Right), -Vec3DotVec3(Loc, Up), Vec3DotVec3(Loc, Dir), 1);
    return m;
}; /* End of 'MatrView' function */

/* END OF 'mat4.js' FILE */

