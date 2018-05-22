const replacements = {
  Rødlistekategorier: 'Rødliste',
  Rotnivå: 'Katalog',
  //    'RKAT': "RL",
  //    'MIV' : "MV",
  '"EN"': '"Truet"',
  '"VU"': '"Sårbar"',
  '"NT"': '"Nær truet"',
  '"DD"': '"Datamangel"',
  //    "RKAT-3": "RL_EN",
  //    "RKAT-4": "RL_VU",
  //    "RKAT-5": "RL_NT",
  //    "RKAT-6": "RL_DD",
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const rename = data => {
  if (!data) return {}
  if (data.navn) data.navn = capitalizeFirstLetter(data.navn)
  if (Array.isArray(data)) {
    data.forEach(barn => {
      if (typeof barn.navn === 'object' && barn.navn !== null) {
        Object.keys(barn.navn).forEach(language => {
          barn.navn[language] = capitalizeFirstLetter(barn.navn[language])
        })
      } else {
        barn.navn = capitalizeFirstLetter(barn.navn)
      }
    })
  }
  if (data.barn)
    data.barn.forEach(barn => (barn.navn = capitalizeFirstLetter(barn.navn)))
  let text = JSON.stringify(data)
  Object.keys(replacements).forEach(k => {
    text = text.replace(k, replacements[k])
  })
  return JSON.parse(text)
}

export default rename
