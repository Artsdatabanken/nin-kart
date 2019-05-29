import terrengmal from "./mal/terreng";
import sysconfig from "Funksjoner/config";

function lagTerreng(drawProps, opplystKode, config) {
  if (!drawProps.erSynlig) return;
  let vertikaltOverdriv = drawProps.vertikaltOverdriv;
  if (opplystKode && opplystKode !== "terreng") vertikaltOverdriv *= 0.25;
  config.layers.terreng = terrengmal;
  config.sources.normals = sysconfig.createTileSource(
    `${sysconfig.storageUrl}Terreng/normaler.3857.mbtiles`,
    "Raster",
    [0, 9],
    [[-90, -180], [90, 180]]
  );
  config.styles.terreng = {
    base: "polygons",
    lighting: false,
    raster: "normal",
    shaders: {
      uniforms: {
        eye1: [0, 0, -1],
        u_scale: vertikaltOverdriv,
        //u_envmap: "/1_gray_lys2.jpg"
        u_envmap: "/treefrog_gray.png"
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
          color = terrainEnvmap(u_envmap, normal);
          color.r *= 0.9;`
      }
    }
  };
}

export { lagTerreng };
