/* FILE NAME  : vec3.js
 * PROGRAMMER : IF4
 * LAST UPDATE: 08.06.2024
 * PURPOSE    : Display of platonic figures.
 *              Mathematic module(vectors).
 */

export class vec3 {
  constructor(x, y, z) {
    this.x = x, this.y = y, this.z = z;   
  }
}

/* Add two vector3 function.
 * ARGUMENTS:
 *   - vectors to be add:
 *       V1, V2;
 * RETURNS:
 *   result vector.
 */
function Vec3AddVec3(V1, V2) {
  V1.x += V2.x;
  V1.y += V2.y;
  V1.z += V2.z;

  return V1;
} /* End of 'Vec3AddVec3' function */

/* Subtracting two vector3 function.
 * ARGUMENTS:
 *   - vectors to subtract:
 *       V1, V2;
 * RETURNS:
 *   subtracked vector.
 */
export function Vec3SubVec3(V1, V2) {
  V1.x -= V2.x;
  V1.y -= V2.y;
  V1.z -= V2.z;

  return V1;
} /* End of 'Vec3SubVec3' function */

/* Multiplying vector3 and number function.
 * ARGUMENTS:
 *   - vector to multiply:
 *       V1;
 *   - number to multiply:
 *       Num;
 * RETURNS:
 *   multiplied vector.
 */
function Vec3MulNum(V1, N) {
  V1.x *= N;
  V1.y *= N;
  V1.z *= N;

  return V1;
} /* End of 'Vec3MulNum' function */

/* Dividing vector3 and number function.
 * ARGUMENTS:
 *   - vector to divide:
 *       V;
 *   - number to divide:
 *       Num;
 * RETURNS:
 *   deivided vector.
 */
function Vec3DivNum(V1, N) {
  V1.x /= N;
  V1.y /= N;
  V1.z /= N;

  return V1;
} /* End of 'Vec3DivNum' function */

/* Dot product of two vector3 function.
 * ARGUMENTS:
 *   - vectors to make dot product:
 *       VEC3 V1, V2;
 * RETURNS:
 *   (FLT) dot product of vectors.
 */
export function Vec3DotVec3(V1, V2) {
  return V1.x * V2.x + V1.y * V2.y + V1.z * V2.z;
} /* End of 'Vec3DotVec3' function */

/* Normalizing vector3 function.
 * ARGUMENTS:
 *   - vector normalize:
 *       V;
 * RETURNS:
 *   normalized vector.
 */
export function Vec3Normalize(V)
{
  let len = Vec3DotVec3(V, V);

  if (len == 1 || len == 0)
    return V;
  return Vec3DivNum(V, Math.sqrt(len));
} /* End of 'Vec3Normalize' function */

/* Cross product of two vectors function.
 * ARGUMENTS:
 *   - vectors to make cross product:
 *       V1, V2;
 * RETURNS:
 *   cross producted vectors.
 */
export function Vec3CrossVec3(V1, V2)
{
  let vec = new vec3(V1.Y * V2.Z - V1.Z * V2.Y,
    V1.Z * V2.X - V1.X * V2.Z,
    V1.X * V2.Y - V1.Y * V2.X);

  return vec;
} /* End of 'Vec3CrossVec3' function */

/* END OF 'vec3.js' FILE */
