import { shallowMount } from '@vue/test-utils'
import ComponentB from '@/components/ComponentB.vue'

describe('ComponentB.vue', () => {
  it('renders mixin message on mount', () => {
    const wrapper = shallowMount(ComponentB)
    expect(wrapper.vm.value).toBe('hello from mixin!')
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
