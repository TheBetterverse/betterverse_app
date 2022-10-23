<!-- u-Components-ProfilePicture -->

<template>
  <div class="bv__profilepicture">
    <div class="bv__profilepicture__pp" :style="{ height, width }">
      <div v-if="modelValue.content || src">
        <img
          class="bv__profilepicture__img bv__globals__skeleton"
          :src="modelValue.dataUrl || src"
          :style="{ height, width }"
        />
      </div>

      <div v-else>
        <u-Icons-EmptyProfilePicture
          width="100%"
          height="100%"
        ></u-Icons-EmptyProfilePicture>
      </div>
    </div>

    <div v-if="editable" class="bv__profilepicture__selectimageicon">
      <label class="bv-input-label" :for="id">
        <input
          class="d-none"
          type="file"
          accept="image/x-png, image/jpeg"
          :name="name"
          :id="id"
          @change="handleChange"
        />
        <icon-camera />
      </label>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    name: 'bv-image-input',

    modelValue: {
      type: Object,
      default: () => {
        return {
          content: undefined,
          dataUrl: undefined,
          valid: true
        }
      }
    },

    editable: {
      type: Boolean,
      default: false
    },

    src: {
      type: String,
      default: ''
    },

    height: {
      type: String,
      default: '80px'
    },

    width: {
      type: String,
      default: '80px'
    },

    id: {
      type: String,
      default: 'bv-image-input'
    }
  },

  methods: {
    handleChange($event) {
      this.modelValue.valid = true
      this.modelValue.content = $event.target.files[0]

      let reader = new FileReader()

      reader.onload = e => {
        this.modelValue.dataUrl = e.target.result
        this.$emit('input', this.modelValue)
      }

      reader.readAsDataURL(this.modelValue.content)
    }
  },

  async created() {
    this.$emit('input', this.modelValue)
  },

  components: {
    IconCamera: $getCustomComponent('u-Icons-Camera'),
    uIconsEmptyprofilepicture: $getCustomComponent(
      'u-Icons-EmptyProfilePicture'
    )
  }
}
</script>

<style>
.bv__profilepicture {
  position: relative;
}

.bv__profilepicture__pp {
  border: 1px solid black;
  border-radius: 50%;
  overflow: hidden;
}

.bv__profilepicture__img {
  object-fit: cover;
  vertical-align: middle;
}

.bv__profilepicture__selectimageicon {
  position: absolute;
  bottom: -3px;
  left: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;

  background: black;
  border-radius: 50%;
}

.bv-input-label:hover {
  cursor: pointer;
}
</style>
