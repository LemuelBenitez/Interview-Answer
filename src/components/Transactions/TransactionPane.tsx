import { useState, useContext } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"
import { AppContext } from "src/utils/context"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const [approved, setApproved] = useState(transaction.approved)
 const{cache} = useContext(AppContext);
  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={!!cache?.current.get(transaction.id)}
        disabled={loading}
        onChange={async (newValue) => {
          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          })
          cache?.current.set(transaction.id,`${approved}`);
          setApproved(newValue)
        }}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
