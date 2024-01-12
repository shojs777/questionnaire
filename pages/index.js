import { useForm, Controller, control } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();
  // const watchLearning = watch("isLearning");
  const watchLearning = watch(["isLearning", "wasLearning"]);
  console.log(watchLearning);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            {/* <input id="name" {...register("name")} /> */}
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
          </div>
          <div>
            <label htmlFor="birth">
              Q2. 生年月日を入力してください。(例： 19900101)
            </label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
            {errors.birth && <span>このフィールドは回答必須です。</span>}
            {errors.birth && errors.birth.type === "required" ? (
              <span>このフィールドは回答必須です。</span>
            ) : null}
            {errors.birth && errors.birth.type === "pattern" ? (
              <span>整数8桁で入力してください。</span>
            ) : null}
          </div>
          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              id="isLearning1"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="isLearning1">はい</label>

            <input
              id="isLearning2"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="isLearning2">いいえ</label>
            {errors.isLearning && <span>このフィールドは回答必須です。</span>}
          </div>

          <div>
            <span>
              Q4. これまでに、プログラミングを学習したことがありますか？
            </span>
            <input
              id="wasLearning1"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="wasLearning1">はい</label>

            <input
              id="wasLearning2"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="wasLearning2">いいえ</label>
            {errors.wasLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          {watchLearning.includes("true") && (
            <div>
              <span>Q5. Q3もしくはQ4で学習した言語は？</span>
              <Controller
                name="language"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} />
                )}
              />
            </div>
          )}
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
}
