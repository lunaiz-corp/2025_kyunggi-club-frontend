/* eslint-disable no-underscore-dangle */

import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

import prettier from "eslint-plugin-prettier"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    ...js.configs.recommended,
    ...tseslint.configs.recommended,
  },
  allConfig: js.configs.all,
})

const eslintConfig = [
  ...compat.extends(
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
  ),
  {
    plugins: {
      prettier,
    },

    rules: {
      "no-nested-ternary": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-unstable-nested-components": "off",
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".js", ".ts", ".jsx", ".tsx"] },
      ],
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "tailwindcss/classnames-order": [
        "warn",
        {
          officialSorting: true,
        },
      ],
    },

    settings: {
      next: {
        rootDir: "apps/*/",
      },
    },
  },
]

export default eslintConfig
