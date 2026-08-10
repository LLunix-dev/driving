#version 300 es

// an attribute is an input (in) to a vertex shader.
out vec3 normal;
out vec3 FragPos;
out vec3 v_color;
// It will receive data from a buffer
in vec4 a_position;
in vec3 a_normal;
in vec3 a_color;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;


void main() {
    
    normal = mat3(transpose(inverse(u_model))) * a_normal;  


    gl_Position =  u_projection * u_view * u_model * a_position;
    FragPos = vec3(u_model * a_position);
    v_color = a_color;
}