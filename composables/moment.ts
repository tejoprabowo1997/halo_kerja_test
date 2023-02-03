import moment from 'moment'

export const useMoment = (dob: string): string => {
  return moment(dob, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD MMM YYYY')
}
