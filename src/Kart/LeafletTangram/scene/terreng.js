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
        global: `vec4 terrainEnvmap (in sampler2D _tex, in vec3 _normal) {
          const vec3 eye = vec3(0.,0.,-1.);
          vec3 r = reflect(eye, _normal);
          r.z += 1.0;
          float m = 2. * length(r);
          vec2 uv = r.xy / m + .5;
          return texture2D(_tex, uv);
        }`,
        color: `
          normal.z /= u_scale; // turn terrain exaggeration up/down
          normal = normalize(normal);
          color = 1.1*terrainEnvmap(u_envmap, normal);`,
      },
    },
  }
}

export { lagTerreng }
