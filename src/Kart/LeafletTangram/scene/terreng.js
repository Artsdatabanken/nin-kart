// @flow
import terrengmal from './mal/terreng'
import sysconfig from '../../../config'

function lagTerreng(drawProps, config) {
  config.layers.terreng = terrengmal
  config.sources.normals = sysconfig.createTileSource(
    'terrain/normals',
    'Raster',
    [0, 15]
  )
  config.styles.terreng = {
    base: 'polygons',
    lighting: false,
    raster: 'normal',
    shaders: {
      uniforms: {
        u_scale: drawProps.vertikaltOverdriv,
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
