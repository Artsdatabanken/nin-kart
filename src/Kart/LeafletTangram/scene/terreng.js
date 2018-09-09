// @flow
import terrengmal from './mal/terreng'

function lagTerreng(lag, config) {
  console.log(lag)
  config.layers.terreng = terrengmal
  config.sources.normals = {
    type: 'Raster',
    url:
      'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
    max_zoom: 15,
  }
  config.styles.terreng = {
    base: 'polygons',
    lighting: false,
    raster: 'normal',
    shaders: {
      uniforms: {
        u_scale: lag.vertikaltOverdriv,
        u_envmap: '/1_gray_lys2.jpg',
      },
      blocks: {
        global:
          'vec4 terrainEnvmap (in sampler2D _tex, in vec3 _normal) {\n    const vec3 eye = vec3(0.,0.,-1.);\n    vec3 r = reflect(eye, _normal);\n    r.z += 1.0;\n    float m = 2. * length(r);\n    vec2 uv = r.xy / m + .5;\n    return texture2D(_tex, uv);\n}\n',
        color:
          '// color = v_color;\nnormal.z /= u_scale; // turn terrain exaggeration up/down\nnormal = normalize(normal);\ncolor = terrainEnvmap(u_envmap, normal);\n',
      },
    },
  }
}

export { lagTerreng }
