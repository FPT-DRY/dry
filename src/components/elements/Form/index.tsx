import React from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Mode,
  Resolver,
  useForm,
  useFormContext,
} from 'react-hook-form';

interface FormProps<T extends FieldValues>
  extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
  mode?: Mode;
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T, any>;
  onSubmit?: (data: T, evt?: any) => void;
  children:
    | React.ReactNode
    | ((methods: ReturnType<typeof useForm<T>>) => React.ReactNode);
}

function Form<T extends FieldValues>({
  mode = 'onChange',
  defaultValues,
  resolver,
  onSubmit,
  children,
  ...formProps
}: FormProps<T>) {
  const methods = useForm<T>({ defaultValues, mode, resolver });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={
          onSubmit
            ? methods.handleSubmit(onSubmit)
            : (evt) => evt.preventDefault()
        }
        {...formProps}
      >
        {typeof children === 'function' && children({ ...methods })}
        {typeof children !== 'function' && children}
      </form>
    </FormProvider>
  );
}

export default Form;

type ConnectFormProps = {
  children: (methods: ReturnType<typeof useFormContext>) => React.ReactNode;
};

export function ConnectForm({ children }: ConnectFormProps) {
  const methods = useFormContext();

  return children({ ...methods });
}
