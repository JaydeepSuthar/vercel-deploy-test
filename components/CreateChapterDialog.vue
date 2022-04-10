<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Chapter</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- <v-col cols="12" sm="12" md="12">
								<v-text-field
									outlined
									v-model="chapter.srno"
									label="Sr no"
								/>
							</v-col> -->
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  autofocus
                  outlined
                  v-model="chapter.name"
                  label="Chapter Name"
                  :rules="[
                    required('Chapter Name'),
                    minLength('Chapter Name', 3),
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="chapter.is_visible"
                  label="Is Active"
                  color="info"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleSubmit"> Save </v-btn>
          <!-- <v-btn color="blue darken-1" text @click="fillForm">
						Generate Mock Data
					</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import validation from "@/utils/validations";
// import faker from "faker";

export default {
  props: ["dialog", "chapters"],
  data() {
    return {
      ...validation,
      chapter: {
        name: "",
        is_visible: false,
      },
    };
  },

  methods: {
    async handleSubmit() {
      if (!(this.chapter.name == "")) {
        try {
          let response = await this.$store.dispatch("chapters/create", {
            ...this.chapter,
            course_id: this.$route.params.id,
          });
          if (response.status === 200 || response.status === 204) {
            this.$store.dispatch("snackbar/setSnackbar", {
              text: `You have successfully created chapter`,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
      (this.chapter = {
        name: "",
        is_visible: false,
      }),
        this.$emit("closeDialog");
    },

    // fillForm() {
    // 	const mockChapterData = {
    // 		name: faker.name.title(),
    // 		is_visible: true,
    // 	};

    // 	this.chapter = mockChapterData;
    // },
  },
};
</script>
