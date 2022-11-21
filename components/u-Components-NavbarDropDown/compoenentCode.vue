<!-- u-Components-NavbarDropdown -->

<template>
  <div class="bv__dropdown">
    <div class="bv__dropdown__title">
      <slot name="default"></slot>
    </div>

    <div class="bv__dropdown__dropdown">
      <div class="bv__dropdown__dropdownitems">
        <slot name="dropdown">
          <p>Item #1</p>
          <p>Item #2</p>
          <p>Item #3</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
.bv__dropdown {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bv__dropdown__dropdown {
  display: none;
  width: max-content;

  position: absolute;
  top: 2rem;

  background: none;
}

.bv__dropdown__dropdownitems {
  background: #ebe9e3;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.bv__dropdown__dropdownitems > * {
  height: 3rem;
  margin: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  pointer-events: all;
  border-radius: 4px;
  appearance: none;
  -moz-appearance: none;
  color: black;
  background: var(--bg-primary) !important;
}

.bv__dropdown__dropdownitems > *:focus,
.bv__dropdown__dropdownitems > *:hover {
  background: rgba(0, 0, 0, 0.05) !important;
  border-radius: 0px;
  cursor: pointer;
}

.bv__dropdown:focus .bv__dropdown__dropdown,
.bv__dropdown:hover .bv__dropdown__dropdown {
  display: flex;
}
</style>