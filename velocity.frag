uniform float time;
uniform vec2 resolution;

uniform sampler2D in_position;
uniform sampler2D in_velocity;
uniform vec3 gravityPosition;
uniform float timeScale;

varying vec2 vUv;
varying vec3 vPos;

void main()	{
	vec4 data = texture2D( in_position, vUv );
	vec3 pos = data.xyz;

	vec4 data2 = texture2D( in_velocity, vUv );
	vec3 vel = data2.xyz;

	float dist = clamp(distance(gravityPosition, pos), 3.0, 10.0);


	vec3 toOrigin = normalize(gravityPosition - pos)/(dist);

	vel += toOrigin*0.006*timeScale;

	if (length(vel) > 0.1) {
		vel = normalize(vel)*0.1;
	}

	gl_FragColor = vec4(vel, 1.0);
}
