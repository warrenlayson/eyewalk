/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  Settings: undefined
  EditProfile: undefined
  SettingsChangePassword: undefined
  DeviceDetail: { id: string }
  AddDevice: undefined
  EditDevice: { id: string }
  SetAddress: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Dashboard: undefined
  Search: undefined
  Notification: undefined
  Profile: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export interface MapboxSearchResponse {
  type: string
  query: string[]
  features: Feature[]
  attribution: string
}

export interface Feature {
  id: string
  type: string
  place_type: string[]
  relevance: number
  properties: Properties
  text: string
  place_name: string
  bbox: number[]
  center: number[]
  geometry: Geometry
  context: Context[]
}

export interface Context {
  id: string
  wikidata: string
  short_code: string
  text: string
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Properties {
  short_code?: string
  wikidata: string
}
