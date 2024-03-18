const webToken = require('jsonwebtoken')
const tokenModel = require('../../models/token')
const dotenv = require('dotenv')
dotenv.config()

ACCESS_KEY = process.env.ACCESS_KEY
REFRESH_KEY = process.env.REFRESH_KEY

const saveToken = async payload => {
  //console.log('payload in saveToken:', payload)
  if (!payload.user) {
    return null
  }
  const accessToken = webToken.sign(payload, ACCESS_KEY, { expiresIn: '15d' })
  const refreshToken = webToken.sign(payload, REFRESH_KEY, { expiresIn: '30d' })
  const checkTokenData = await tokenModel.findOneToken(payload.user)

  if (checkTokenData) {
    tokenModel.updateOne(payload.user, refreshToken)
    return {
      accessToken,
      refreshToken
    }
  }
  const token = tokenModel.RegUser(payload.user, refreshToken)
  return {
    accessToken,
    refreshToken
  }
}

const removeToken = async refreshToken => {
  const tokenInfo = await tokenModel.deleteOne(refreshToken)
  return tokenInfo
}

const findToken = async refreshToken => {
  const tokenInfo = await tokenModel.findOneToken(refreshToken)
  return tokenInfo
}

const validateAccessToken = token => {
  try {
    const userData = webToken.verify(token, ACCESS_KEY)
    return userData
  } catch (error) {
    return null
  }
}

const validateRefreshToken = token => {
  try {
    const userData = webToken.verify(token, REFRESH_KEY)
    return userData
  } catch (error) {
    return null
  }
}

module.exports = {
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken
}
