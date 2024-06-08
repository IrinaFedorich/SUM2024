/* FILE NAME  : buffer_class_patterns.js
 * PROGRAMMER : IF4
 * LAST UPDATE: 08.06.2024
 * PURPOSE    : Display of platonic figures.
 *              Buffer module.
 */

class _buffer {
  constructor(type, size) {
    this.type = type;    // Buffer type (gl.***_BUFFER)
    this.size = size;    // Buffer size in bytes
    this.id = null;
    if (size == 0 || type == undefined)
      return;
    this.id = gl.createBuffer();
    gl.bindBuffer(type, this.id);
    gl.bufferData(type, size, gl.STATIC_DRAW);
  }
  update(data) {
  }
}

class _ubo_buffer extends _buffer {
  constructor(name, size, bindPoint) {
    super(gl.UNIFORM_BUFFER, size);
    this.name = name;
    this.bindPoint = bindPoint; // Buffer GPU binding point
  }
  apply (shd) {
    if (shd == undefined || shd.id == undefined || shd.uniformBlocks[this.name] == undefined)
      return;
    gl.uniformBlockBinding(shd.id, shd.uniformBlocks[this.name].index, this.bindPoint);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, this.bindPoint, this.id);
  }                        
}

class _vertex_buffer extends _buffer {
  constructor(name, size, bindPoint) {
    super(gl.UNIFORM_BUFFER, size);
    this.name = name;
    this.bindPoint = bindPoint; // Buffer GPU binding point
  }
  apply (shd) {
    if (shd == undefined || shd.id == undefined || shd.uniformBlocks[this.name] == undefined)
      return;
    gl.uniformBlockBinding(shd.id, shd.uniformBlocks[this.name].index, this.bindPoint);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, this.bindPoint, this.id);
  }                        
}

/* Buffer setting function.
 * ARGUMENTS:
 *   - buffer parameters:
 *       type, size;
 * RETURNS:
 *   created buffer.
 */
export function buffer(type, size) {
  return new _buffer(type, size);
} /* End of 'buffer' function */

/* UBO buffer setting function.
 * ARGUMENTS:
 *   - buffer parameters:
 *       name, size, bindPoint;
 * RETURNS:
 *   created ubo buffer.
 */
export function ubo_buffer(name, size, bindPoint) {
  return new _ubo_buffer(name, size, bindPoint);
} /* End of '_ubo_buffer' function */

/* END OF 'buffer_class_patterns.js' FILE */

