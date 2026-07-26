import assert from 'node:assert/strict'
import { test } from 'node:test'

import { classifyWay } from './terrain'

const way = (highway: string, tags: Record<string, unknown> = {}) =>
  ({ id: 0, highway, surface: null, geometry: [], ...tags }) as Parameters<typeof classifyWay>[0]

test('a sidewalk belongs to the road it runs along', () => {
  assert.equal(classifyWay(way('footway', { footway: 'sidewalk' })), 'road')
  assert.equal(classifyWay(way('footway', { footway: 'crossing' })), 'road')
  // Even when explicitly surfaced
  assert.equal(classifyWay(way('footway', { footway: 'sidewalk', surface: 'concrete' })), 'road')
})

test('a standalone paved path is a paved path', () => {
  // Park path — highway=footway with no footway=* subtag
  assert.equal(classifyWay(way('footway', { surface: 'asphalt' })), 'pavedPath')
  assert.equal(classifyWay(way('footway')), 'pavedPath')
  assert.equal(classifyWay(way('cycleway')), 'pavedPath')
})

test('a cycleway alongside a road is a road', () => {
  assert.equal(classifyWay(way('cycleway', { sidepath: true })), 'road')
})

test('a paved rural road is a road, dirt is unpaved', () => {
  // Fire road, paved
  assert.equal(classifyWay(way('track', { surface: 'asphalt' })), 'road')
  // Fire road, untagged — tracks are usually dirt
  assert.equal(classifyWay(way('track')), 'unpaved')
  assert.equal(classifyWay(way('track', { surface: 'gravel' })), 'unpaved')
})

test('a dirt road is unpaved regardless of road class', () => {
  assert.equal(classifyWay(way('residential', { surface: 'dirt' })), 'unpaved')
  assert.equal(classifyWay(way('residential')), 'road')
  assert.equal(classifyWay(way('primary', { surface: 'asphalt' })), 'road')
})

test('trails stay unpaved unless surfaced', () => {
  assert.equal(classifyWay(way('path')), 'unpaved')
  assert.equal(classifyWay(way('bridleway')), 'unpaved')
  assert.equal(classifyWay(way('path', { surface: 'asphalt' })), 'pavedPath')
})
