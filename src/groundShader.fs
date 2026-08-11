#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
in vec3 normal;
in vec3 FragPos;
in vec3 v_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
out vec4 outColor;

void main() {
    // Just set the output to a constant reddish-purple
    vec3 lightpos = vec3(0.0, 5.0, 0.0);
    float ambientStrength = 0.2;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 objectColor = vec3(1.0, 0.0, 0.0);


    vec3 norm = normalize(normal);
    vec3 lightdir = normalize(lightpos - FragPos);
    float diff = max(dot(norm, lightdir), 0.0);
    vec3 diffuse = diff * lightColor;

    vec3 ambient = ambientStrength * lightColor;
    vec3 result = (ambient + diffuse) * texture(u_texture, v_texcoord).rgb;
    outColor = vec4(result, 1.0);

}