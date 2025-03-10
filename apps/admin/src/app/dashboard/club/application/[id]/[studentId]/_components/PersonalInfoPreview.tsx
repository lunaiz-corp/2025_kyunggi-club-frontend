/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextInput } from "@packages/ui/components/krds/Input"

import type { SubmittedForm } from "@/api/types/application"

export default function PersonalInfoPreview({
  form,
}: Readonly<{
  form: Pick<SubmittedForm, "userInfo" | "parentInfo">
}>) {
  return (
    <div className="mb-24 flex flex-col gap-6">
      <div className="h-0.5 bg-gray-800" />

      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-5">
            <label
              htmlFor="student-id"
              className="cursor-pointer text-2xl font-bold"
            >
              학번
            </label>
            <TextInput
              id="student-id"
              type="text"
              className="bg-gray-800"
              value={form.userInfo.id}
              disabled
            />
          </div>

          <div className="flex w-full flex-col gap-5">
            <label
              htmlFor="student-name"
              className="cursor-pointer text-2xl font-bold"
            >
              학생 이름
            </label>
            <TextInput
              id="student-name"
              type="text"
              className="bg-gray-800"
              value={form.userInfo.name}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label
            htmlFor="student-phone"
            className="cursor-pointer text-2xl font-bold"
          >
            학생 전화번호
          </label>
          <TextInput
            id="student-phone"
            type="tel"
            className="flex-1 bg-gray-800"
            value={form.userInfo.phone}
            disabled
          />
        </div>

        <div className="h-0.5 bg-gray-800" />

        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-5">
              <label
                htmlFor="parent-name"
                className="cursor-pointer text-2xl font-bold"
              >
                학부모 이름
              </label>
              <TextInput
                id="parent-name"
                type="text"
                className="bg-gray-800"
                value={form.parentInfo.name}
                disabled
              />
            </div>

            <div className="flex w-full flex-col gap-5">
              <label
                htmlFor="parent-relationship"
                className="cursor-pointer text-2xl font-bold"
              >
                학생 간 관계
              </label>
              <TextInput
                id="parent-relationship"
                type="text"
                className="bg-gray-800"
                value={form.parentInfo.relationship}
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label
              htmlFor="parent-phone"
              className="cursor-pointer text-2xl font-bold"
            >
              학부모 전화번호
            </label>
            <TextInput
              id="parent-phone"
              type="tel"
              className="flex-1 bg-gray-800"
              value={form.parentInfo.phone}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
