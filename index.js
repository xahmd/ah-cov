// build with love by ahmed.
// https://arteam.me

const chalk = require('chalk')
const yargs = require('yargs')
const { promisify } = require('util')
const request = promisify(require('request').get)
const token = '13faaf98c4msh60d857634ffa70dp1bc433jsn995dbaba52d6'
const reqlink = 'https://coronavirus-smartable.p.rapidapi.com'

var tempmsg = yargs
  .usage('template: -cov SA')
  .example('-cov SA', 'check cov19 Status in any country you want.')
  .alias('cov', 'country')
  .nargs('cov', 1)
  .describe('cov', 'Country Code')
  .demandOption(['cov'])
  .argv

const getdata = async (countryCode) => {
  const options = {
    url: `${reqlink}/stats/v1/${countryCode}/`,
    headers: {
      'x-rapidapi-host': 'coronavirus-smartable.p.rapidapi.com',
      'x-rapidapi-key': token,
      useQueryString: true
    }
  }
  const { body } = await request(options)
  return JSON.parse(body)
}

const getdata2 = (data) => {
  const { stats, location: { countryOrRegion } } = data
  const { totalConfirmedCases, newlyConfirmedCases, newDeaths, totalRecoveredCases } = stats
  console.log(`Country: ${chalk.yellowBright(countryOrRegion)}`)
  console.log(`Total Confirmed Cases: ${chalk.yellowBright(totalConfirmedCases)}`)
  console.log(`New Confirmed Cases: ${chalk.redBright(newlyConfirmedCases)}`)
  console.log(`New Deaths: ${chalk.redBright(newDeaths)}`)
  console.log(`Recovered: ${chalk.blueBright(totalRecoveredCases)}`)
}

getdata(tempmsg.country)
  .then(getdata2)
  .catch(err => console.log(err.message))
